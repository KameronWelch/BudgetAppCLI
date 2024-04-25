import React, { useState, useEffect, useCallback } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { PlaidLink, LinkExit, LinkSuccess } from 'react-native-plaid-link-sdk';



const Accounts = ({ navigation }: any) => {
  const [linkToken, setLinkToken] = useState(null);
  const [data, setData] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  const createLinkToken = useCallback(async () => {
    await fetch(`http://${address}:8080/api/create_link_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address: address })
    })
      .then((response) => response.json())
      .then((data) => {
        setLinkToken(data.link_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setLinkToken])

  // Fetch balance data
  const getBalance = useCallback(async () => {
    await fetch(`http://${address}:8080/api/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setData(data);
        calculateTotalBalance(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const calculateTotalBalance = (data) => {
    if (!data || !data.Balance || !data.Balance.accounts) {
      setTotalBalance(0);
      return;
    }

    let total = 0;
    data.Balance.accounts.forEach(account => {
      total += account.balances.current || 0;
    });
    setTotalBalance(total);
  };

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken]);

  // const renderAccounts = () => {
  //   if (!data || !data.Balance || !data.Balance.accounts) return null;

  //   return data.Balance.accounts.map(account => (
  //     <View key={account.account_id} style={styles.accountRow}>
  //       <Text style={styles.bankNameText}>{account.name}</Text>
  //       <Text style={styles.bankAmount}>{account.balances.current}</Text>
  //     </View>
  //   ));
  // };

  // Your default text to display when the FlatList is empty
  const renderEmptyComponent = () => (
    <View style={styles.emptyRender}>
      <Text style={styles.emptyRenderText}>Looks like you haven't added an account yet.</Text>
      <Text style={styles.emptyRenderText}>Click the Add Account button to get started!</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.accountRow}>
        <Text style={styles.bankNameText}>{item.name}</Text>
        <Text style={styles.bankAmount}>${item.balances.current}.00</Text>
      </View>
    </TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subtitle}>Your total available balance is</Text>
        <Text style={styles.title}>${totalBalance.toFixed(2)}</Text>
      </View>
      <View >
        <View>

          {/* <Text style={{    
          fontSize: 12,
    fontWeight: 'bold',
    color: "gray",
    alignSelf: "center",
    paddingBottom: 12,}}>
          {
            JSON.stringify(data)
          }
        </Text> */}
          {/* {renderAccounts()} */}

          <FlatList
            data={data?.Balance?.accounts || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.account_id}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>
        <PlaidLink
          tokenConfig={{
            token: linkToken,
            noLoadingState: false,
          }}
          onSuccess={async (success: LinkSuccess) => {
            await fetch(`http://${address}:8080/api/exchange_public_token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ public_token: success.publicToken }),
            })
              .catch((err) => {
                console.log(err);
              });
            // navigation.navigate('SuccessScreen', SuccessScreen);
            getBalance(); // Call getBalance after exchanging the public token
          }}
          onExit={(response: LinkExit) => {
            console.log(response);
          }}>

          
            <Text style={styles.addAccountButton}>Add Account</Text>

        </PlaidLink>
      </View>
      {/* <View>
        <Text style={styles.subtitle}>
          {
            JSON.stringify(data)
          }
        </Text>
      </View> */}
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#0047AB",
    alignSelf: "center",
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "gray",
    alignSelf: "center",
    paddingBottom: 12,
  },
  accountRow: {
    //backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: "space-between",
    gap: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',

    padding: 10,



  },
  bankNameText: {
    fontSize: 24,
    fontWeight: 'normal',

  },
  bankAmount: {
    fontSize: 24,
    fontWeight: 'normal',
    marginLeft: 20, // Adjusted margin for space between the two sides
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    

  },
  emptyRender: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyRenderText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
  },
  addAccountButton: {
    backgroundColor: '#0047AB',
    borderRadius: 10,
    height: 58,
    marginHorizontal: 20,
    marginTop: 10,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: "center",
    paddingTop: 10,
    
},
});
