import PropTypes from 'prop-types';
import { Col, Container, Row, Spinner } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeGrid = ({ recipes, updateRecipeQuantity, lastRecipeElementRef }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipes.length > 0) {
      setLoading(false);
    }

  }, [recipes]);

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="gy-4"> {/* Add vertical spacing between rows */}
          {recipes.map((recipe, index) => (
            <Col
              key={recipe.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              ref={index === recipes.length - 1 ? lastRecipeElementRef : null}
            >
              <div>
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  updateRecipeQuantity={updateRecipeQuantity}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

RecipeGrid.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      // Add other recipe properties here
    })
  ).isRequired,
  updateRecipeQuantity: PropTypes.func.isRequired,
  lastRecipeElementRef: PropTypes.func.isRequired, // Add this prop type
};

export default RecipeGrid;
