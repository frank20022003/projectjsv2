
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MarketCapNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/marketcap');
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market cap news:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Market Cap News</h2>
        </Col>
      </Row>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {news.map((item, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card style={{ height: '100%' }}>
                <Card.Body>
                  <Card.Title>{item.name} ({item.ticker})</Card.Title>
                  <Card.Text>
                    <strong>Market Cap:</strong> ${item.market_cap.toLocaleString()}<br />
                    <strong>Updated:</strong> {new Date(item.updated * 1000).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MarketCapNews;
