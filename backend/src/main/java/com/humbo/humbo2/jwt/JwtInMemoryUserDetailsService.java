package com.humbo.humbo2.jwt;

import java.util.Optional;

import com.humbo.humbo2.domain.CustomUser;
import com.humbo.humbo2.repository.CustomUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  @Autowired
  CustomUserRepository repository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Optional<CustomUser> user = this.repository.findByEmail(email);
    if (!user.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", email));
    }

    return new JwtUserDetails(null, user.get().getEmail(), user.get().getPassword(), user.get().getRoles());
  }

}
