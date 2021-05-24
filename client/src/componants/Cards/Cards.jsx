import Card from '../Card/Card'
import './Cards.css'

function Cards({title}) {
    return (
        <> 
        <div className="_division-title">
            <h1>{title}</h1>
        </div>
        <div className="_card-container">
            {[1,2,3].map(()=>{
                return <Card />
            })}
        </div>
        </>
    )
}

export default Cards
