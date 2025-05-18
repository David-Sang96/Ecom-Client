import { useIsFetching } from "@tanstack/react-query";
import { useNavigation } from "react-router";

const ProgressBar = () => {
  const navigation = useNavigation();
  const fetching = useIsFetching() > 0;

  if (fetching || navigation.state !== "idle") {
    return (
      <div className="fixed top-0 left-0 w-full">
        <div className="h-[3px] w-full overflow-hidden bg-pink-100">
          <div className="loading-progress left-right bg-own h-full w-full" />
        </div>
      </div>
    );
  }

  return null;
};

export default ProgressBar;
