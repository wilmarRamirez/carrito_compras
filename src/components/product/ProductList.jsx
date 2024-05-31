import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../contexts/ShoppingCartContext';
import { Loading } from '../loading/Loading';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts } = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_Berry');
        const modifiedProducts = response.data.map(product => ({
          ...product,
          quantity: 1
        }));
        setProducts(modifiedProducts);
      } catch (error) {
        setError('Error al obtener los productos');
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  const onAddProduct = product => {
    if (allProducts.find(item => item.ID === product.ID)) {
      const updatedProducts = allProducts.map(item =>
        item.ID === product.ID
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setTotal(total + parseInt(product.Precio_detal));
      setCountProducts(countProducts + 1);
      setAllProducts(updatedProducts);
      return;
    }

    setTotal(total + parseInt(product.Precio_detal) * parseInt(product.quantity));
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  const renderProducts = () => {
    return products.map((product) => (
      <Col key={product.ID} xs={12} sm={6} md={4} lg={3} className="mb-4">
        <Card style={{ width: '100%', height: '100%' }}>
          <Card.Img variant="top" src={product.Imagen_publica.url} />
          <Card.Body>
            <Card.Title>{product.Referencia}</Card.Title>
            <Card.Text>$ {product.Precio_detal}</Card.Text>
            <Button variant="primary" onClick={() => onAddProduct(product)}>
              Añadir al carrito
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container>
      <Row>
        {products.length > 0 ? renderProducts() : <p>No hay productos disponibles.</p>}
      </Row>
    </Container>
  );
};
