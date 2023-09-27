const SignIn = () => {
  const onSignInSuccess = () => {
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Duong",
        password: "123123123",
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data));
  };

  const onSignInFailed = () => {
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Duong1",
        password: "123123123",
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data));
  };

  return (
    <section>
      <h2>Login</h2>
      <button
        style={{
          cursor: "pointer",
        }}
        onClick={onSignInSuccess}
      >
        SignIn success
      </button>

      <button
        style={{
          cursor: "pointer",
        }}
        onClick={onSignInFailed}
      >
        SignIn failed
      </button>
      <p>You should open the console to let you see the status and data</p>
    </section>
  );
};

export default SignIn;
