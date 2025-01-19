const SummaryCard = ({ icon, title, value, color }) => {
    return (
        <div className = "flex bg-white rounded-3xl shadow-xl">
            <div className = { `flex items-center justify-center ${ color } text-white text-3xl px-4 rounded-s-3xl` }>
                { icon }
            </div>

            <div className = "pl-4 py-1">
                <p className = "text-lg font-semibold">
                    { title }
                </p>

                <p className = "text-xl font-bold">
                    { value }          
                </p>
            </div>
        </div>
    );
};


export default SummaryCard;
