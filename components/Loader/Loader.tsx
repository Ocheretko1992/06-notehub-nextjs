import { DNA, RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <DNA
        visible={true}
        height="30"
        width="30"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
export const LoaderLoading = () => {
  return (
    <div className={css.wrapperLoading}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

