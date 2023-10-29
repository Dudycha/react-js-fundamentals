import React from "react";
import styles from "../css/cookBook.module.css";

class Banner extends React.Component {
  render() {
    return (
      <h1 className={styles.banner}>
        {this.props.banner.name}
      </h1>
    );
  }
}

export default Banner;
