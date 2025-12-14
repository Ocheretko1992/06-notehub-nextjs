'use client';

type ErrorProps = {
  error: Error;
};

const Error = ({ error }: ErrorProps) => {
  return (
    <h1 style={{ color: 'black', display: 'flex', justifyContent: 'center',alignItems:'center',height:'100vh'}}>
      Could not fetch the list of notes. {error.message}
    </h1>
  );
};
export default Error;
