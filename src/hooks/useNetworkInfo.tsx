import { useNetInfo } from "@react-native-community/netinfo";

const useNetworkInfo = () => {
  const { isConnected, isInternetReachable } = useNetInfo();

  const isNetworkUnknown: boolean =
    isConnected === null && isInternetReachable === null;

  const isOnline: boolean =
    isConnected === true || isInternetReachable === true;

  return { isOnline, isNetworkUnknown };
};

export default useNetworkInfo;
