import { useNavigation } from "react-router";

const ProgressBar = () => {
  const navigation = useNavigation();
  // const fetching = useIsFetching() > 0;

  if (navigation.state !== "idle") {
    return (
      <div className="fixed left-0 top-0 w-full">
        <div className="h-[3px] w-full overflow-hidden bg-pink-100">
          <div className="loading-progress left-right h-full w-full bg-own" />
        </div>
      </div>
    );
  }

  return null;
};

export default ProgressBar;
