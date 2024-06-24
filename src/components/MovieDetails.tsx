const MovieDetails = ({selectedId, onCloseMovieDetails} : {selectedId : string}) => {
    return (
        <div className = "details" >
            <button className="btn-back" onClick={onCloseMovieDetails}>
                &larr;
            </button>
            {selectedId}
        </div>
    )
}

export default MovieDetails;