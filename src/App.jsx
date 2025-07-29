import styles from "./App.module.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AlertMessage } from "./components/AlertMessage/AlertMessage";
import { BrowserRouter as Router } from "react-router-dom";
import { Title } from "./common/components/Title/Title";
import { Form } from "./common/components/Form/Form";
import { Card } from "./common/components/Card/Card";
import { useDispatchQueryStatus } from "./common/hooks/useDispatchQueryStatus";
import { askAIThunk } from "./store/slices/alertSlice";
import { useState } from "react";

const App = () => {
  const [queryRunner, isRunning] = useDispatchQueryStatus(askAIThunk);
  const [insights, setInsights] = useState({});
  return (
    <>
      <AlertMessage />
      <div className={styles.app}>
        <Title>Stock Insights AI</Title>
        <Card>
          <Form
            fields={["Ticker"]}
            requiredFields={["Ticker"]}
            primaryCTA="Get Insights.."
            onSubmit={(data) => setInsights(queryRunner(data["Ticker"]))}
          />
          {isRunning && "Loading..."}
          {insights && <pre>{JSON.stringify(insights, null, 2)}}</pre>}
        </Card>
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
