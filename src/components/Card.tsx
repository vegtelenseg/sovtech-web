import React from "react";
import cx from "clsx";
import Color from "color";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, CardMedia } from "@material-ui/core";
// @ts-ignore
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import { Row, Item } from "@mui-treasury/components/flex";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(({ palette }) => ({
  color: ({ color }: { color: string }) => ({
    "&:before": {
      backgroundColor: Color(color).darken(0.3).desaturate(0.2).toString(),
    },
  }),
  root: {
    position: "relative",
    borderRadius: "1rem",
    minWidth: 320,
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      "&:before": {
        bottom: -6,
      },
      "& $logo": {
        transform: "scale(1.1)",
        boxShadow: "0 6px 20px 0 rgba(0,0,0,0.38)",
      },
    },
  },
  cover: {
    borderRadius: "1rem",
    height: "44%",
  },
  content: ({ color }: { color: string }) => ({
    position: "relative",
    zIndex: 1,
    borderRadius: "1rem",
    boxShadow: `0 6px 16px 0 ${Color(color).fade(0.5)}`,
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 0,
      width: "100%",
      height: "100%",
      clipPath:
        "polygon(0% 100%, 0% 35%, 0.3% 33%, 1% 31%, 1.5% 30%, 2% 29%, 2.5% 28.4%, 3% 27.9%, 3.3% 27.6%, 5% 27%,95% 0%,100% 0%, 100% 100%)",
      borderRadius: "1rem",
      background: `linear-gradient(to top, ${color}, ${Color(color)
        .rotate(24)
        .lighten(0.12)})`,
    },
  }),
  title: {
    marginTop: "1rem",
  },
  logo: {
    transition: "0.3s",
    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.24)",
    borderRadius: "1rem",
  },
  team: {
    fontFamily: "Sen",
    fontSize: "0.75rem",
    color: palette.text.hint,
  },
  button: {
    fontFamily: "Sen",
    color: palette.common.white,
    backgroundColor: palette.text.hint,
    opacity: 0.72,
    fontSize: "0.75rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: 12,
    transition: "0.3s all ease-in",
    "&:hover": {
      boxShadow: "0 4px 12px 0 rgba(0,0,0,0.74)",
    },
  },
  subtitle: {
    textTransform: "uppercase",
    fontFamily: "Fjalla One",
    fontSize: "1rem",
    color: palette.common.white,
    margin: 0,
  },
}));

interface CardOptions {
  cover: string;
  logo: string;
  title: React.ReactNode;
  homeworld: string;
  detailsText: string;
  subtitle: string;
  height: string;
  onClick: () => void;
}

export const Card = ({
  cover,
  logo,
  title,
  homeworld,
  detailsText,
  height,
  subtitle,
  onClick,
}: CardOptions) => {
  const mediaStyles = useCoverCardMediaStyles();
  const styles1 = useStyles({ color: "#fc7944" });
  const styles2 = useStyles({ color: "#5357ce" });
  const styles = styles1;
  return (
    <Box className={cx(styles.root, styles.color)} pt={20}>
      <CardMedia image={cover} className={styles.cover} classes={mediaStyles} />
      <Box className={styles.content} p={2}>
        <Box position={"relative"} zIndex={1}>
          <Row p={0} gap={2}>
            <Item>
              <Avatar className={styles.logo} src={logo} />
            </Item>
            <Item position='top'>
              <Typography variant='h2' className={styles.title}>
                {title}
              </Typography>
              <Typography variant='h4'>
                {subtitle.charAt(0).toUpperCase() + subtitle.substring(1)}
              </Typography>
              <Typography variant='h6'>{height} cm tall</Typography>
            </Item>
          </Row>
          <Row mt={4} alignItems={"center"}>
            <Item>
              <div className={styles.team}>{homeworld}</div>
            </Item>
            <Item position={"right"} onClick={onClick}>
              <div className={styles.button}>{detailsText}</div>
            </Item>
          </Row>
        </Box>
      </Box>
    </Box>
  );
};
