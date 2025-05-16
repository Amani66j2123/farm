import React from "react"; // ✅ REQUIRED for JSX
import { Card, CardBody, CardTitle, CardText } from "reactstrap";




const About = () => {
  return (
    <div className="container my-5">
      <Card className="shadow-lg border-0 rounded-4 p-4 bg-light">
        <CardTitle tag="h2" className="text-center text-success mb-4 fw-bold">
          🌿 About Our Farm 🌿
        </CardTitle>
        <CardBody className="fs-5 text-dark">
          <CardText className="mb-4">
            Welcome to our charming green farm – a peaceful escape for families, friends, or anyone looking to enjoy nature and relaxation. Our farm offers a range of amenities to ensure a comfortable and fun-filled visit:
          </CardText>

          <ul className="mb-4">
            <li>🏊‍♂️ Large swimming pool with a dedicated kids' section</li>
            <li>🛏️ Comfortable rooms for overnight stays</li>
            <li>👩‍🍳 Fully equipped kitchen with all essentials</li>
            <li>🎠 Outdoor playground for children</li>
            <li>🎉 Dedicated party space with lights and sound setup</li>
            <li>🔥 BBQ area with grill and seating</li>
            <li>🪴 Beautiful garden and nature walkways</li>
            <li>🕹️ Indoor games: table tennis, foosball, and board games</li>
            <li>🚗 Secure parking for guests</li>
            <li>🌇 A sunset-view deck for evening relaxation</li>
          </ul>

          <h4 className="text-success mb-3">💰 Rental Pricing Details</h4>
          <p>
            Our standard daily base price is <strong>$35</strong>. Pricing is adjusted based on the day of the week and includes a tax rate:
          </p>

          <ul>
            <li>
              <strong>Weekdays (Sunday to wednesday):</strong> Normal base price + 5% tax.
            </li>
            <li>
              <strong>Weekends (Thursday to Saturday):</strong> Price increased by 15%, then a 5% tax is added.
            </li>
          </ul>

          <p className="text-muted mt-4">
            * Special rates may apply during public holidays or peak seasons. For event bookings or group discounts, please contact us.
          </p>

          <h4 className="text-success mt-5">📩 Contact Us</h4>
          <p>
            Have questions or want to any thing ? Reach out at:{" "}
            <a href="mailto:greenFarm@gmail.com" className="text-decoration-none fw-bold">
              greenFarm@gmail.com
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default About;
