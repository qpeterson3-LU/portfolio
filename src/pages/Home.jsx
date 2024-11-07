import { useEffect, useState, useRef } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Typewriter from "typewriter-effect";
import emailjs from "@emailjs/browser";

import PortfolioList from "../components/portfolioList";
import { QuinnsData } from "../data/quinnsData";
import ProjectModal from "../components/projectModal";

const HomePage = () => {
  const form = useRef(null);

  const [message, setMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selected, setSelected] = useState("featured");
  const [data, setData] = useState([]);
  const list = [
    {
      id: "featured",
      title: "Featured",
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleItemClick = (project) => {
    setSelectedProject(project);
    openModal();
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_08klcg4",
        "template_x5d9fdk",
        form.current,
        "9_6gf3kizKPIWRFgZ"
      )
      .then(
        function () {
          console.log("SUCCESS!");
          e.target.reset();
          window.alert("Thank you, your email has been sent!");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  useEffect(() => {
    switch (selected) {
      case "featured":
        setData(QuinnsData[0].projects);
        break;
      // default:
      // setData(featuredPortfolio);
    }
  }, [selected]);

  return (
    <div key={selected} className="home-page">
      <div className="intro" id="intro">
        <div className="left">
          <div className="imgContainer">
            <img src="./bendy-man-working-on-a-computer.gif" alt="" />
          </div>
        </div>
        <div className="right">
          <div className="wrapper">
            <h2>Hi There, I'm</h2>
            <h1>Quinn Peterson</h1>
            <h3>
              <Typewriter
                options={{
                  strings: QuinnsData[0].titles,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </h3>
          </div>
          <a href="#portfolio">
            <img src="assets/down.png" alt="" />
          </a>
        </div>
      </div>

      {/* PORTFOLIO SECTION */}
      <div className="portfolio" id="portfolio">
        <h1>Portfolio</h1>
        <ul>
          {list.map((item) => (
            <PortfolioList
              key={item.id}
              title={item.title}
              active={selected === item.id}
              setSelected={setSelected}
              id={item.id}
            />
          ))}
        </ul>

        <div className="container">
          {data.map((d) => (
            <div key={d.id} className="item" onClick={() => handleItemClick(d)}>
              <img src={d.images[0]} alt="" />
              <h3>{d.title}</h3>
            </div>
          ))}
        </div>
        <ProjectModal isOpen={isModalOpen} onClose={closeModal}>
          {selectedProject && (
            <>
              <div className="project-details">
                <h2>{selectedProject.title}</h2>
                {selectedProject.images &&
                  selectedProject.images.length > 0 && (
                    <div className="slider-container">
                      <AwesomeSlider
                        animation="fallAnimation"
                        className="slider-image"
                        infinite={true}
                      >
                        {selectedProject.images.map((image, index) => (
                          <div key={index} data-src={image} />
                        ))}
                      </AwesomeSlider>
                    </div>
                  )}
                {/* Add more details or components based on your project structure */}
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Technologies Used:
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  {selectedProject.technologies.map((technology, index) => (
                    <Box
                      key={index}
                      bgcolor="#3498db"
                      color="#FFFFFF"
                      p={1}
                      m={1}
                      borderRadius={8}
                    >
                      {technology}
                    </Box>
                  ))}
                </Box>
                <Typography variant="body1" className="test2">
                  {selectedProject.descriptions.map((description, index) => (
                    <span key={index}>
                      {description}
                      <br />
                    </span>
                  ))}
                </Typography>

                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  className="test"
                >
                  <Grid item>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      href={selectedProject.liveDemoLink}
                    >
                      Live Demo
                    </Button> */}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={selectedProject.codeLink}
                    >
                      View Code
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </ProjectModal>
      </div>
      {/* END OF PORTFOLIO SECTION */}

      {/* CONTACT SECTION */}
      <div className="contact" id="contact">
        <div className="left">
          <img src="./shake.svg" alt="" />
        </div>
        <div className="right">
          <h2>Contact</h2>
          <form ref={form} onSubmit={sendEmail}>
            <input
              type="email"
              name="from_name"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
            <textarea name="message" placeholder="Your message"></textarea>
            <button type="submit">Send</button>
            <span style={{ display: buttonClicked ? "inline" : "none" }}>
              Thanks, I'll reply ASAP :)
            </span>
          </form>
        </div>
      </div>
      {/* END OF CONTACT SECTION */}
    </div>
  );
};

export default HomePage;
