# Flujo de Integracion con Stripe (Checkout y Webhooks)

Este documento detalla la arquitectura y el ciclo de vida del proceso de pago de la tienda vintage, utilizando Stripe Checkout y Webhooks sincronizados con Supabase.

---

## 1. Mapeo de Variables de Entorno

Para habilitar la pasarela de pagos, se deben configurar las siguientes variables en el archivo `.env.local`:

STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Secreto de firmas de Webhooks (se obtiene de Stripe CLI o Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_...

# URL base de la aplicacion
NEXT_PUBLIC_APP_URL=http://localhost:3000

---

## 2. Flujo Completo del Checkout (Paso a Paso)

### Paso 1: Iniciacion de la Compra (Cliente)
1. El usuario navega por la tienda y selecciona una prenda unica en estado available.
2. Al pulsar en "Comprar", el cliente envía una petición POST al endpoint de la API local /api/checkout con el product_id.

### Paso 2: Creacion de la Sesion en el Servidor (/api/checkout)
1. El servidor valida que el producto exista en Supabase y que su estado sea available.
2. Se realiza una llamada a la API de Stripe para crear una sesion de Checkout (stripe.checkout.sessions.create):
   - Line Items: Nombre de la prenda, imagen principal y precio.
   - Mode: payment.
   - Metadata: Se adjunta el product_id para identificar la prenda tras el pago.
   - Shipping Address Collection: Configurado para solicitar la direccion de envio del cliente.
   - URLs de Retorno: 
     - Success: ${NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}
     - Cancel: ${NEXT_PUBLIC_APP_URL}/products/${product_id}
3. La API devuelve la URL de redireccion de Stripe (session.url).

### Paso 3: Redireccion y Pago
1. El navegador del cliente es redirigido a la pasarela segura alojada por Stripe.
2. El cliente introduce su tarjeta, datos de contacto y direccion de entrega.
3. Al completar el pago con éxito, Stripe redirige al usuario a la página de confirmacion de la tienda.

---

## 3. Sincronizacion en Segundo Plano (Webhook de Stripe)

El proceso de pago es asíncrono. La confirmacion del pedido y el cambio de estado de la prenda se gestionan mediante eventos transmitidos por Webhooks de Stripe al endpoint /api/webhooks/stripe.

### Endpoint del Webhook (/api/webhooks/stripe)

1. Verificacion de Firma:
   El endpoint lee el cuerpo de la peticion como un Buffer raw y verifica el encabezado stripe-signature mediante stripe.webhooks.constructEvent() usando STRIPE_WEBHOOK_SECRET. Esto garantiza que la peticion proviene de Stripe y no de un tercero.

2. Procesamiento del Evento checkout.session.completed:
   Cuando la firma es válida y el evento es de tipo checkout.session.completed:
   - Se extraen la sesion de Stripe, la informacion de envio (shipping_details), el correo electrónico del comprador (customer_details.email) y los metadatos (product_id).
   - Se inicia una consulta coordinada en Supabase:
     a. Se inserta un nuevo registro en la tabla orders:
        - stripe_session_id
        - product_id
        - customer_email
        - customer_name
        - shipping_address (objeto JSON con calle, ciudad, codigo postal, país)
        - amount_total
        - status = 'paid'
     b. Se actualiza la tabla products para la prenda correspondiente:
        - status = 'sold'
3. Respuesta HTTP:
   - Si todo es correcto, se responde con un estado 200 OK.
   - Si ocurre un error durante el guardado en la base de datos, se responde con un estado 500 Error para que Stripe reintente la entrega del evento.

---

## 4. Pruebas Locales con Stripe CLI

Para probar el flujo de pagos y la recepcion de webhooks en entorno de desarrollo local:

1. Iniciar la aplicacion:
   npm run dev

2. Escuchar eventos con Stripe CLI:
   En una terminal independiente, ejecutar:
   stripe listen --forward-to localhost:3000/api/webhooks/stripe

3. Configurar el Secreto:
   Copiar el valor whsec_... que muestra la terminal de Stripe CLI y pegarlo en STRIPE_WEBHOOK_SECRET dentro de .env.local.

4. Simular eventos (Opcional):
   stripe trigger checkout.session.completed