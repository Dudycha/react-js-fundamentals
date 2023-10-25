import React from "react";
import styles from "../css/cookBook.module.css";

class Banner extends React.Component {
  render() {
    return (
      <h1 className={styles.banner} >
        Kuchařka{"  "}
        <span className={styles.header}>
          {this.props.classroom.name}
        </span>
      </h1>
    );
  }
} 

export default Banner;
