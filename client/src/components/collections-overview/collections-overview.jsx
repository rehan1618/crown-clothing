import './collections-overview.scss';
import { connect } from 'react-redux';
import { selectCollectionsForPreview } from '../../redux/shop/shop-selectors';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../collection-preview/collection-preview';

const CollectionsOverview = ({ collections }) => {
  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollection }) => (
        <CollectionPreview key={id} {...otherCollection} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
