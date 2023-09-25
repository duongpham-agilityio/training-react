import { UseUpdateState, useUpdateState } from "../../stores";

export const WithImmer = () => {
  const { info, handleUpdateWithImmer } = useUpdateState(
    ({
      info,
      handleUpdateWithImmer,
    }: UseUpdateState): Pick<
      UseUpdateState,
      "info" | "handleUpdateWithImmer"
    > => ({ info, handleUpdateWithImmer })
  );

  return (
    <>
      <h2>Update State with Immer</h2>
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
        {`  set(
      produce((state: UseUpdateState) => {
        state.info.school.name = "New";
      })
    );`}
      </p>
      <button onClick={handleUpdateWithImmer}>Click</button>
    </>
  );
};
