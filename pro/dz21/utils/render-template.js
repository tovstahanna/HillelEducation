const utils = {
    renderTemplate(template, data){
        let resultTemplate = template;

        if(data){
            Object.keys(data).forEach(key => {
                resultTemplate = resultTemplate.replaceAll(`{{${key}}}`, data[key]);
            });
        } 

        return resultTemplate;
    },

    validation(email, password){
        let error = [];
    
        if( password && password != '' ) {
            if(password.length < 6){
                error.push('Password is less then 6 symbols');
            }
            // else{
            //     error.push('Password is incorrect');
            // }
        }   
    
        if( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
            error.push('Email has incorrect format');
        }
    
        return error;
    }
}

export default utils;