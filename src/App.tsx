import { useCallback, useRef, useState } from 'react';
import { BrandsSection } from './components/BrandsSection/BrandsSection';
import { CategoryShortcuts } from './components/CategoryShortcuts/CategoryShortcuts';
import { HeroBanner } from './components/HeroBanner/HeroBanner';
import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header/Header';
import { Newsletter } from './components/Newsletter/Newsletter';
import { PartnersBanners } from './components/PartnersBanners/PartnersBanners';
import { ProductModal } from './components/ProductModal/ProductModal';
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { ProductsJsonLd } from './components/ProductShowcase/ProductsJsonLd';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';

const SHOWCASE_TITLE = 'Produtos relacionados';

export function App() {
  const { state, retry } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleSelectProduct = useCallback((product: Product, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    // Devolve o foco ao elemento que abriu o modal.
    triggerRef.current?.focus();
  }, []);

  const showcaseProps = { state, onRetry: retry, onSelectProduct: handleSelectProduct };

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />

      <main id="conteudo">
        <HeroBanner />
        <CategoryShortcuts />
        <ProductShowcase
          id="produtos-relacionados"
          title={SHOWCASE_TITLE}
          variant="tabs"
          {...showcaseProps}
        />
        <PartnersBanners id="parceiros-1" />
        <ProductShowcase
          id="produtos-relacionados-2"
          title={SHOWCASE_TITLE}
          variant="see-all"
          {...showcaseProps}
        />
        <PartnersBanners id="parceiros-2" />
        <BrandsSection />
        <ProductShowcase
          id="produtos-relacionados-3"
          title={SHOWCASE_TITLE}
          variant="see-all"
          {...showcaseProps}
        />
        <Newsletter />
      </main>

      <Footer />

      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      {state.status === 'success' && <ProductsJsonLd products={state.products} />}
    </>
  );
}
