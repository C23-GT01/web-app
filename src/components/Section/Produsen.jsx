import ProdusenBox from "../Elements/ProdusenBox";

const Produsen = ({ src }) => {
    return (
        <div className="py-4 xl:px-0 p-4">
            <h1 className="font-h1 font-inter text-2xl mb-8 text-center">Produsen</h1>
            <ProdusenBox src={src} />
        </div>
    )
}

export default Produsen;