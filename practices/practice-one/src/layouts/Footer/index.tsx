import containerStyles from 'styles/commons/container.module.css';
import footerStyles from './footer.module.css';
import Grid from 'components/Grid';
import logo from 'assets/images/logo.jpg';

const Footer = () => {
  return (
    <footer
      className={`${footerStyles.mainFooter} ${containerStyles.container}`}
    >
      <Grid col={3} row={1} className={footerStyles.grid}>
        <div className={footerStyles.footerItem}>
          <p className={footerStyles.text}>Developed Duong.Pham</p>
        </div>
        <div className={footerStyles.footerItem}>
          <img src={logo} alt="agility" className={footerStyles.footerLogo} />
        </div>
        <div className={footerStyles.footerItem}>
          <p className={footerStyles.text}>Mentor: Cu.Nguyen</p>
          <p className={footerStyles.text}>Supportor: Huy.Pham</p>
        </div>
      </Grid>
    </footer>
  );
};

export default Footer;
