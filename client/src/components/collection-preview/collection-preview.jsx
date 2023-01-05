import React from "react";
import "./collection-preview.scss";
import CollectionItem from "../../components/collection-item/collection-item";
import { Link } from "react-router-dom";

const CollectionPreview = ({ title, items }) => {
	return (
		<div className="collection-preview">
			<h1 className="title">
				<Link to={`shop/${title.toLowerCase()}`}>{title}</Link>
			</h1>
			<div className="preview">
				{items
					.filter((item, indx) => indx < 4)
					.map(item => (
						<CollectionItem key={item.id} item={item} />
					))}
			</div>
		</div>
	);
};

export default CollectionPreview;
