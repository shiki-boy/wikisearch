import './PageItem.scss'

const PageItem = ( value, row, navigate ) => (
  <div
    className='page-item'
    onClick={ () => navigate( `/view-page?title=${ encodeURIComponent( value ) }` ) }
  >
    {value}
  </div>
)

export default PageItem
