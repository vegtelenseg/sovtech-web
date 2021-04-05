import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fade: {
    position: "relative" as "relative",
    width: "100%",
    minHeight: "60vh",
    top: -25,
    backgroundImage: "linear-gradient(0deg, transparent, black 75%)",
    zIndex: 1,
  },
  star_wars: {
    display: "flex",
    justifyContent: "center",
    position: "relative" as "relative",
    height: "50vh",
    color: "#feda4a",
    fontFamily: "'Pathway Gothic One', sans-serif",
    fontSize: "500%",
    fontWeight: 600,
    letterSpacing: 6,
    lineHeight: "150%",
    perspective: 400,
    textAlign: "justify",
  },
  crawl: {
    "& > title": {
      fontSize: "90%",
      textAlign: "center",
    },
    "& > title h1": {
      margin: "0 0 100px",
      textTransform: "uppercase",
    },
    position: "relative" as "relative",
    top: 99999,
    transformOrigin: "50% 100%",
    animation: "crawl 60s linear",
  },
  crawl____title: {},
  crawl____title_h1: {},
}));

export const OpeningCrawl = () => {
  const classes = useStyles();
  return (
    <div className={classes.fade}>
      <section className={classes.star_wars}>
        <div className={classes.crawl}>
          <div className={classes.crawl____title}>
            <p>Episode IV</p>
            <h1>A New Hope</h1>
          </div>

          <p>
            It is a period of civil war. Rebel spaceships, striking from a
            hidden base, have won their first victory against the evil Galactic
            Empire.
          </p>

          <p>
            During the battle, Rebel spies managed to steal secret plans to the
            Empire’s ultimate weapon, the DEATH STAR, an armored space station
            with enough power to destroy an entire planet.
          </p>

          <p>
            Pursued by the Empire’s sinister agents, Princess Leia races home
            aboard her starship, custodian of the stolen plans that can save her
            people and restore freedom to the galaxy….
          </p>
        </div>
      </section>
    </div>
  );
};
