import classes from './CssModules.module.scss';

export const CssModules = () => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>- CSS Modules -</p>
      <button className={classes.button}>BUTTON</button>
    </div>
  )
}