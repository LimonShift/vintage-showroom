-- 1. Crear tabla de productos (Prendas únicas)
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  size VARCHAR(20) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  condition VARCHAR(50) NOT NULL DEFAULT 'Bueno',
  condition_notes TEXT,
  images TEXT[] DEFAULT '{}',
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 2. Crear tabla de pedidos (Sincronizada con Stripe)
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  shipping_address JSONB NOT NULL,
  amount_total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'paid',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Seguridad para Productos
CREATE POLICY "Productos visibles para todos" 
  ON public.products FOR SELECT USING (true);

CREATE POLICY "Solo autenticados modifican productos"
  ON public.products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Políticas de Seguridad para Pedidos (LO QUE FALTABA)
CREATE POLICY "Permitir crear pedidos desde backend/webhook" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Solo autenticados ven pedidos"
  ON public.orders FOR SELECT
  TO authenticated
  USING (true);

-- 6. Configuración del Bucket de Imágenes y sus permisos (LO QUE FALTABA)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('clothing-images', 'clothing-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Imagenes publicas para todos" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'clothing-images');

CREATE POLICY "Solo autenticados suben imagenes" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'clothing-images' AND auth.role() = 'authenticated');