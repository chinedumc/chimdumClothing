import { useNavigate } from "react-router-dom";
import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
	const { title, imageUrl, route } = category;

	const navigate = useNavigate()

	 const onNavHandler = () => navigate(route)
	return (
		<DirectoryItemContainer onClick={onNavHandler}>
			<BackgroundImage
				imageUrl={imageUrl}
				// style={{ backgroundImage: `url(${imageUrl})` }}
			/>
			<Body>
				<h2>{title.toUpperCase()}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
