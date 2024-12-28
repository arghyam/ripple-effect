import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Form } from 'react-bootstrap';
import styled, { keyframes, css } from 'styled-components';
import { Recipe } from '../../screens/CalculateScreen';



interface RecipeCardProps {
  recipe: Recipe;
  updateRecipeQuantity: (id: string, quantity: number) => void;
}

const PlaceholderImage = styled.svg`
  width: 100%;
  height: 200px; /* Fixed size */
  background-color: #e0e0e0;
  display: block;
`

const moveUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
`;

const moveDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(5px);
  }
`;

const CardWrapper = styled(Card)`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const QuantityControl = styled.div<{ animate: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.animate === 'increase' &&
    css`
      animation: ${moveUp} 0.3s ease-out;
    `}

  ${(props) =>
    props.animate === 'decrease' &&
    css`
      animation: ${moveDown} 0.3s ease-out;
    `}
`;

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, updateRecipeQuantity }) => {
  const [quantity, setQuantity] = useState<number>(recipe.quantity);
  const [showQuantity, setShowQuantity] = useState<boolean>(false);
  const [animate, setAnimate] = useState<string>('');

  useEffect(() => {
    if (recipe.quantity === 0 && showQuantity) {
      setShowQuantity(false);
    } else if (recipe.quantity > 0 && !showQuantity) {
      setShowQuantity(true);
    }
  }, [recipe.quantity, showQuantity]);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    updateRecipeQuantity(recipe.id, newQuantity);
  };

  const handleAddClick = () => {
    setShowQuantity(true);
    setQuantity(1); // Start with 1 when add is clicked
    updateRecipeQuantity(recipe.id, 1);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateRecipeQuantity(recipe.id, newQuantity);
    setAnimate('increase');
    setTimeout(() => setAnimate(''), 300);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      setShowQuantity(false);
      setQuantity(0);
      updateRecipeQuantity(recipe.id, 0);
    } else {
      const newQuantity = Math.max(0, quantity - 1);
      setQuantity(newQuantity);
      updateRecipeQuantity(recipe.id, newQuantity);
      setAnimate('decrease');
      setTimeout(() => setAnimate(''), 300);

    }
  }


  return (
    <CardWrapper>
      <Card className="card">
      {recipe.thumbnail_url ? (
          <CardImg variant="top" src={recipe.thumbnail_url} className="card-img-top" style={{ width: '100%', height: '200px' }} />
        ) : (
          <PlaceholderImage>
            <rect width="100%" height="100%" fill="#e0e0e0" />
            <text x="50%" y="50%" textAnchor="middle" fill="#888" fontSize="20px">No Image Available</text>
          </PlaceholderImage>
        )}
      <CardBody className="card-body">
        <CardTitle className="card-title">{recipe.name}</CardTitle>
        <CardText className="card-text">{Math.round(recipe.water_footprint)} L per 1 Serving</CardText>

        {!showQuantity && (
          <Button 
            onClick={handleAddClick} 
            style={{ width: '100%', display: 'block', margin: '0 auto' }}
          >
            Add
          </Button>
        )}

        {showQuantity && (
           <QuantityControl animate={animate}>
            <Button variant="secondary" onClick={decreaseQuantity} style={{ margin: '0 10px' }}>
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <Form.Group controlId="formQuantity" style={{ margin: '0 10px' }}>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                style={{ width: '50px', textAlign: 'center' }}
              />
            </Form.Group>
            <Button variant="secondary" onClick={increaseQuantity} style={{ margin: '0 10px' }} >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          
           </QuantityControl>
            
        )}
      </CardBody>
    </Card>
    </CardWrapper>
    
  );
};

export default RecipeCard;
