export interface overlayProps {
    isDrawerOpen: boolean,
    closeDrawer: () => void
}
export default function overlay({ isDrawerOpen, closeDrawer }: overlayProps) {
    return (
        <div id="overlay" className={`fixed inset-0  bg-opacity-50 z-40 ${isDrawerOpen ? "block" : "hidden"} lg:hidden`} onClick={closeDrawer}></div>)
}