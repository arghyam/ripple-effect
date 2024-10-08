import { Col, Container, Row, Spinner } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { useEffect, useState,RefCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Recipe } from "../../screens/CalculateScreen";



interface RecipeGridProps {
  recipes: Recipe[];
  updateRecipeQuantity: (id: string, quantity: number) => void;
  lastRecipeElementRef: RefCallback<HTMLDivElement>;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, updateRecipeQuantity, lastRecipeElementRef }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipes.length > 0) {
      console.log('new recipegrid items', recipes);
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

export default RecipeGrid;
