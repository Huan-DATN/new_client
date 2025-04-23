import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import ShopsFilter from './shops-filter';
import ShopsGridSection from './shops-grid-section';

function ShopsList() {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="flex flex-col w-full h-full"
		>
			<ResizablePanel defaultSize={25}>
				<ShopsFilter />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={75}>
				<ShopsGridSection />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}

export default ShopsList;
