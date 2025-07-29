import styles from "./App.module.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AlertMessage } from "./components/AlertMessage/AlertMessage";
import { BrowserRouter as Router } from "react-router-dom";
import { Title } from "./common/components/Title/Title";
import { Form } from "./common/components/Form/Form";
import { useDispatchQueryStatus } from "./common/hooks/useDispatchQueryStatus";
import { askAIThunk } from "./store/slices/alertSlice";
import { useState } from "react";

const App = () => {
  const [queryRunner, isRunning] = useDispatchQueryStatus(askAIThunk);
  const [insights, setInsights] = useState();
  return (
    <>
      <AlertMessage />
      <div className={styles.app}>
        <Title>📈 Stock Insights AI</Title>
        <Form
          className={styles.form}
          fields={["Ticker"]}
          requiredFields={["Ticker"]}
          primaryCTA="Get Insights.."
          onSubmit={(data) => {
            queryRunner(data).then((resp) => {
              if (resp.meta.requestStatus === "fulfilled") {
                setInsights(resp.payload);
              } else {
                setInsights("Something went wrong, please try again.");
              }
            });
          }}
        />
        <br />
        {isRunning
          ? "Loading..."
          : insights && <pre>{JSON.stringify(insights, null, 2)}</pre>}
      </div>
    </>
  );
};

const StoreWrapperApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default StoreWrapperApp;
