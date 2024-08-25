package com.capstone.backend.jwtAuth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.capstone.backend.user.UserController;
import com.capstone.backend.userDetails.CustomUserDetailsService;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request, jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain chain)
            throws java.io.IOException, jakarta.servlet.ServletException {
    	try {
	        String authorizationHeader = request.getHeader("Authorization");
	
	        String username = null;
	        String jwt = null;
	
	        // Extract JWT from the Authorization header
	        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
	        	
	            jwt = authorizationHeader.substring(7);
	            username = jwtUtil.extractUsername(jwt);
	            
	            logger.info("Inside doFilterInternal with jwt and username:"+username);
	        }
	
	        // Validate token and set authentication context
	        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        	logger.info("..Inside doFilterInternal with jwt and username:"+username);
	        	
	            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	
	            if (jwtUtil.validateToken(jwt, userDetails)) {
	                JwtAuthenticationToken authentication = new JwtAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authentication);
	            }
	        }
	
	        chain.doFilter(request, response);
    	} catch (Exception ex) {
    		logger.error("Exception raised in doFilterInternal: ", ex);
    	}
    }
}





