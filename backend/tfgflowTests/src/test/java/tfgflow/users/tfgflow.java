package tfgflow.users;

import com.intuit.karate.junit5.Karate;

class tfgflow {
    
    @Karate.Test
    Karate testUsers() {
        return Karate.run("users").relativeTo(getClass());
    }    

}
