import HistoryBox from "../Elements/HistoryBox";
import Section from "./Index";

const History = ({data}) => {
    return (
        <Section title="Sejarah">
            <div className="mt-5">
                <HistoryBox image={data.image} text={data.text} />
            </div>
        </Section>
    )
}

export default History;