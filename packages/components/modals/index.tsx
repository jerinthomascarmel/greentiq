import { SalesAddModal, SalesEditModal } from "./SaleModal";
import { ActivityAddModal, ActivityEditModal } from "./ActivityModal";

type ModalProps = {
    open: boolean
    onClose: () => void
    operation: 'add' | 'edit',
    selectedData?: any,
    mutate?: any
}

export function ActivityModal(props: ModalProps) {
    const { open, onClose, operation, selectedData } = props;
    if (operation == "add") {
        return <ActivityAddModal open={open} onClose={onClose}  />
    } else if (operation == "edit") {
        return <ActivityEditModal open={open} onClose={onClose} data={selectedData}  />
    } else {
        return null;
    }
}

export function SalesModal(props: ModalProps) {
    const { open, onClose, operation, selectedData ,mutate} = props;
    if (operation == "add") {
        return <SalesAddModal open={open} onClose={onClose} mutate={mutate} />
    } else if (operation == "edit") {
        return <SalesEditModal open={open} onClose={onClose} data={selectedData} mutate={mutate} />
    } else {
        return null;
    }
}
