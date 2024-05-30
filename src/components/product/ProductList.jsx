import React, { useEffect, useState } from 'react'
/* import  data  from '../../data'; */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Await } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { CiTextAlignCenter } from 'react-icons/ci';

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fechtProductos = async () => {
      try {
        const response = await axios.get("https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Productos_Berry");
        const modifiedProducts = response.data.map(product => ({
          ...product,
          quantity: 1
        }));
        setProducts(modifiedProducts);
      } catch (error) {
        setError('Error al obtener los productos');
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false)
      }
    };
    fechtProductos();
  }, []);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  const onAddProduct = product => {
    if (allProducts.find(item => item.ID === product.ID)) {
      const products = allProducts.map(item =>
        item.ID === product.ID
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setTotal(parseInt(total) + parseInt(product.Precio_detal));
      setCountProducts(countProducts + 1);
      return setAllProducts([...products]);
    }
    setTotal(total + parseInt(product.Precio_detal) * parseInt(product.quantity));
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  return (
    <div style={{ display: 'flex' }}>
      {products && products.length > 0 && products.map((product, index) => (
        <Container >
          <Card style={{ width: '10rem', margin: '1rem', height:'20rem' }} key={product.ID}>
            <Card.Img variant="top" src={product.Imagen_publica.url} />
            <Card.Body>
              <Card.Title>{product.Referencia}</Card.Title>
              {/* <Card.Text>
              {product.description}
            </Card.Text> */}
              <Card.Text>
                $ {product.Precio_detal}
              </Card.Text>
              <Button variant="primary" onClick={() => onAddProduct(product)}>
                Añadir al carrito
              </Button>
            </Card.Body>
          </Card>
        </Container>
      ))}
    </div>
  )
}