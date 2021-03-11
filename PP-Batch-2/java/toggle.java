import java.io.*;

public class Main {

	public static String toggleCase(String inp){
		String res = "";
		for(int idx = 0 ; idx < inp.length() ; idx++){
		    char ch = inp.charAt(idx);
		    
		    if('a' <=  ch && ch <= 'z'){
		        // lower case letter :  change ch to upper case
		        int uc = 'A' + (ch - 'a');
		        res = res + (char)uc;
		    }else if('A' <= ch && ch <= 'Z'){
		        // upper case letter :  change ch to lower case
		        int lc = ('a' + (ch-'A'));
		        res = res + (char)lc;
		    }
		}

		return res;
	}
	public static void main(String[] args) {
		Scanner scn = new Scanner(System.in);
		String str = scn.next();
		System.out.println(toggleCase(str));
	}
}