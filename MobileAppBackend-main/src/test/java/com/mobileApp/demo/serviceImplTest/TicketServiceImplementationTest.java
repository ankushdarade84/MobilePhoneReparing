//package com.mobileApp.demo.serviceImplTest;
//
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.Mockito.when;
//
//import java.util.ArrayList;
//import java.util.Optional;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import com.mobileApp.demo.Pojo.TicketPojo;
//import com.mobileApp.demo.ServiceImpl.TechnicianServiceImpl;
//import com.mobileApp.demo.ServiceImpl.TicketSeviceImplementation;
//import com.mobileApp.demo.model.Ticket;
//import com.mobileApp.demo.repo.ComponentRepo;
//import com.mobileApp.demo.repo.TechnicianRepo;
//import com.mobileApp.demo.repo.TicketRepo;
//import com.mobileApp.demo.repo.UserRepo;
//
//class TicketSeviceImplementationTest {
//
//    @Mock
//    private TicketRepo ticketRepo;
//
//    @Mock
//    private UserRepo userRepo;
//
//    @Mock
//    private TechnicianServiceImpl technicianImpl;
//
//    @Mock
//    private TechnicianRepo techRepo;
//
//    @Mock
//    private ComponentRepo componentRepo;
//
//    @InjectMocks
//    private TicketSeviceImplementation ticketService;
//
////    @BeforeEach
////    void setUp() {
////        MockitoAnnotations.openMocks(this);
////    }
//
//    @Test
//    void testUpdateTicket() {
//        // Arrange
//        int ticketId = 1;
//        TicketPojo ticket = new TicketPojo();
//        ticket.setMobileModel("Mobile Model");
//        ticket.setProblemDescription("Problem Description");
//        ticket.setResponse("Response");
//        ticket.setComponentId(new ArrayList<>());
//
//        Ticket existingTicket = new Ticket();
//        existingTicket.setTicketId(ticketId);
//        existingTicket.setMobileModel("Old Mobile Model");
//        existingTicket.setProblemDescription("Old Problem Description");
//        existingTicket.setResponse("Old Response");
//
//        Optional<Ticket> newTicketOptional = Optional.of(existingTicket);
//
//        when(ticketRepo.findById(ticketId)).thenReturn(newTicketOptional);
//        when(ticketRepo.save(existingTicket)).thenReturn(existingTicket);
//
//        // Act
//        String result = ticketService.updateTicket(ticketId, ticket);
//
//        // Assert
//        assertEquals(existingTicket.toString(), result);
//        assertEquals(ticket.getMobileModel(), existingTicket.getMobileModel());
//        assertEquals(ticket.getProblemDescription(), existingTicket.getProblemDescription());
//        assertEquals(ticket.getResponse(), existingTicket.getResponse());
//    }
//
//    @Test
//    void testUpdateTicket_NotFound() {
//        // Arrange
//        int ticketId = 1;
//        TicketPojo ticket = new TicketPojo();
//
//        when(ticketRepo.findById(ticketId)).thenReturn(Optional.empty());
//
//        // Act & Assert
//        assertThrows(RuntimeException.class, () -> {
//            ticketService.updateTicket(ticketId, ticket);
//        });
//    }
//
//    // Add more test cases for other methods
//
//}
//
//	
//
