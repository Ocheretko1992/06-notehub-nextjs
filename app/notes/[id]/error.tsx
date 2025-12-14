'use client';
interface ErrorProp {
  error: Error;
}

const Error = ({ error }: ErrorProp) => {
  return <p>Could not fetch note details. {error.message}</p>;
};
export default Error;
