import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import ProductsFilter from './products-filter';
import ProductsGridSection from './products-grid-section';

function ProductList() {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="flex flex-col w-full h-full"
		>
			<ResizablePanel defaultSize={25}>
				<ProductsFilter />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={75}>
				<ProductsGridSection />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}

export default ProductList;
