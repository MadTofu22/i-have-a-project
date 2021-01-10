
const contractDesigners = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONTRACT_DESIGNERS':

        return formatData(action.payload);
      default:
        return state;
    }
  };

  const formatData = (payload) => {
    let designers = []

    for (const contract of payload) {
        let designerObj = {
            id: contract.designer.designer_id,
            first_name: contract.designer.first_name,
            last_name: contract.designer.last_name,
            rate: Number(contract.designer.rate),
            requested_hours: contract.info.requested_hours,
            company: contract.manager.company
        }
        console.log(designerObj, contract);
        
        designers.push(designerObj)
    }
    return designers
  }
  export default contractDesigners;