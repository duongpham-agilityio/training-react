import { UseUpdateState, useUpdateState } from "../../stores";

export const WithNormal = () => {
  const { info, handleUpdateWithNormal } = useUpdateState(
    ({
      info,
      handleUpdateWithNormal,
    }: UseUpdateState): Pick<
      UseUpdateState,
      "info" | "handleUpdateWithNormal"
    > => ({ info, handleUpdateWithNormal })
  );

  return (
    <>
      <h2>Update State with Normal Approach</h2>
      <p>{JSON.stringify(info)}</p>
      <p
        style={{
          padding: "20px",
          background: "black",
          color: "white",
        }}
      >
        <b>
          code <br />
        </b>
        {` set(({ info: { name, ...restInfo }, ...rest }: UseUpdateState) => ({
      info: { ...restInfo, name: "$"{name} "$"{random} },
      ...rest,
    }));`}
      </p>
      <button onClick={handleUpdateWithNormal}>Click</button>
    </>
  );
};
