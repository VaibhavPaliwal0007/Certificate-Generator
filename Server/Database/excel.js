const excel = require('read-excel-file/node')


const parentFunc = async() =>{
        let arr= [];

        const func= async() => {
            try{
                const rows = await excel('./Excel/names.xlsx')

                for(i in rows){
                    arr.push(rows[i][0])
                }
            }

            catch(e){
                console.log(e)
            }
        } 
        await func()

       console.log(arr)
}

parentFunc()