import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import withSpinner from "../../components/with-spinner/with-spinner";
import {  selectIsCollectionsLoaded } from '../../redux/shop/shop-selectors';
import CollectionsPage from './collection';


const mapStatToProps = createStructuredSelector({
isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStatToProps),
    withSpinner,
)(CollectionsPage);

export default CollectionPageContainer