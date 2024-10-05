import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Row, Col, Form } from 'react-bootstrap';

const RecipeCard = ({ recipe, updateRecipeQuantity }) => {
  const [quantity, setQuantity] = useState(recipe.quantity);
  const [showQuantity, setShowQuantity] = useState(false);
  const [animate, setAnimate] = useState('');


  useEffect(() => {
    if(recipe.quantity == 0 && showQuantity == true) {
      setShowQuantity(false)
    }
    
  }, [recipe]);

  
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    updateRecipeQuantity(recipe.name, newQuantity);
  };

  const handleAddClick = () => {
    setShowQuantity(true);
    setQuantity(1); // start with 1 when add is clicked
    updateRecipeQuantity(recipe.id, 1)
    
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateRecipeQuantity(recipe.id, quantity)
    setAnimate('increase');
    setTimeout(() => setAnimate(''), 300);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      setShowQuantity(false);
      setQuantity(0);
      updateRecipeQuantity(recipe.id, 0)
    } else {
      setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
      updateRecipeQuantity(recipe.id, quantity)
      setAnimate('decrease'); // Add decrease animation class
      setTimeout(() => setAnimate(''), 300); // Remove animation class after animation ends
    }
  }
    



  return (
    <Card className="card">
      <CardImg variant="top" src={recipe.image} className="card-img-top" />
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
        <div className="quantity-control" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button variant="secondary" onClick={decreaseQuantity} style={{ margin: '0 10px' }} className={animate === 'decrease' ? 'animate-down' : ''} >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Form.Group controlId="formQuantity" style={{ margin: '0 10px' }}>
            <Form.Control
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              style={{
                width: '50px',
                textAlign: 'center'
              }}
            />
          </Form.Group>
          <Button variant="secondary" onClick={increaseQuantity} style={{ margin: '0 10px' }} className={animate === 'increase' ? 'animate-up' : ''}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      )}
      <style jsx>{`
      
      .card {
            transition: transform 0.3s ease;
          }
          .card:hover {
            transform: scale(1.05);
          }
        .quantity-control .animate-up {
          animation: moveUp 0.3s ease-out;
        }
        .quantity-control .animate-down {
          animation: moveDown 0.3s ease-out;
        }
        @keyframes moveUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-5px);
          }
        }
        @keyframes moveDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(5px);
          }
        }
      `}</style>
        
      </CardBody>
    </Card>
  );
};

export default RecipeCard;

