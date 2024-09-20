import useStore from "./store"



export default function StaticUI() {

    const setModelActive = useStore((state) => state.setModelActive);
    const setFlowerActive = useStore((state) => state.setFlowerActive);

    function growModel() {
        setModelActive(true);
    }

    function growFlower() {
        console.info("flowers")
        setFlowerActive(true)
    }

    return (
        <>
            <div className="ui-cat" onClick={growModel}>Cat✨</div>
            <div className="ui-flower" onClick={growFlower}>💡</div>
        </>
    );
}
